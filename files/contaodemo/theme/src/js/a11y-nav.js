class A11yNav {

    constructor(options) {
        this.options = this._merge({
            selector: 'header .nav-main',
            minWidth: 1024,
            classes: {
                submenuButton: 'btn-toggle-submenu',
                expand: 'nav-expanded'
            },
            ariaLabels: {
                'main': 'Main menu',
                'expand': 'Expand menu: ',
                'collapse': 'Collapse menu: '
            }
        }, options || {});

        this.navigation = document.querySelector(this.options.selector);

        if (!this.navigation) {
            return;
        }

        this.dropdowns = [];
        this.active = [];

        this._init();
        this._createSubMenuButton();

        this.dropdowns.forEach(dropdown => {
            this._initDropdown(dropdown)
        });
    }

    /**
     * Merges configuration options and replaces them if they exist
     *
     * @private
     */
    _merge(a, b) {
        return [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce((result, key) => ({
            ...result,
            [key]: "object" === typeof (a[key]) ? Object.assign({}, a[key], b[key]) : !b[key] ? a[key] : b[key]
        }), {});
    }

    /**
     * Placeholder button that is cloned for each submenu item
     *
     * @private
     */
    _createSubMenuButton() {
        this.btn = document.createElement('button');
        this.btn.classList.add(this.options.classes.submenuButton);
        this.btn.ariaHasPopup = 'true';
        this.btn.ariaExpanded = 'false';
    }

    /**
     * Initializes navigation items and sets aria-attributes if they do not exist
     *
     * @private
     */
    _init() {
        this._createSubMenuButton()

        if (!this.navigation.ariaLabel) {
            this.navigation.ariaLabel = this.options.ariaLabels.main
        }

        this.navigation.querySelectorAll('li').forEach(item => {

            if (item.classList.contains('submenu')) {
                this.dropdowns.push(item);
            }

            const navItem = item.firstElementChild;

            if (navItem.classList.contains('active')) {
                navItem.ariaCurrent = 'page';
            }

            if (!navItem.ariaLabel && navItem.title) {
                navItem.ariaLabel = navItem.title;
                navItem.removeAttribute('title');
            }
        })

        // Hide the active navigation on escape
        document.addEventListener('keyup', (e) => {
            e.key === 'Escape' && this._hide();
        })
    }

    /**
     * Updates the aria labels and state for the dropdown buttons
     *
     * @private
     */
    _updateAriaState(dropdown, show) {
        dropdown.btn.ariaLabel = (show ? this.options.ariaLabels.collapse : this.options.ariaLabels.expand) + dropdown.btn.dataset.label;
        dropdown.btn.ariaExpanded = show ? 'true' : 'false';
    }

    /**
     * Collapses the dropdown
     *
     * @private
     */
    _collapse(dropdown) {
        dropdown.classList.remove(this.options.classes.expand);
        this._updateAriaState(dropdown, false)
    }

    /**
     * Handles hiding dropdowns. Adding no parameter will close all
     *
     * @private
     */
    _hide(dropdown = null) {
        if (0 === this.active.length) return;

        // Case 1: Leaving the previous dropdown (e.g. focus left)
        if (this.active.includes(dropdown)) {
            this._collapse(dropdown);
            this.active = this.active.filter(node => node !== dropdown);
        }

        // Case 2: Not contained in the tree at all, remove everything
        else if (null === dropdown || this.active[0] !== dropdown && !this.active[0].contains(dropdown)) {
            this.active.forEach(node => this._collapse(node));
            this.active = [];
        }

        // Case 3: Down the drain with everything that ain't a parent node :)
        else {
            this.active.filter(node => {
                if (node.contains(dropdown)) {
                    return true;
                }

                this._collapse(node);
                return false;
            });
        }
    }

    /**
     * Shows the dropdown
     *
     * @private
     */
    _show(dropdown) {
        this._hide(dropdown);

        dropdown.classList.add(this.options.classes.expand);
        this._updateAriaState(dropdown, true);

        if (!this.active.includes(dropdown)) {
            this.active.push(dropdown);
        }
    }

    /**
     * Updates the dropdown state
     *
     * @private
     */
    _toggle(dropdown, show) {
        show ? this._show(dropdown) : this._hide(dropdown);
    }

    /**
     * Adds a submenu button that toggles submenu navigations
     *
     * @private
     */
    _addSubMenuButton(dropdown) {
        const item = dropdown.firstElementChild,
              btn = this.btn.cloneNode();

        dropdown.btn = btn;

        btn.dataset.label = item.textContent;
        btn.ariaLabel = this.options.ariaLabels.expand + item.textContent;

        btn.addEventListener('click', () => {
            const show = btn.ariaExpanded === 'false' ?? true;
            this._toggle(dropdown, show);
        });

        item.after(btn);
    }

    /**
     * Mouse enter event for dropdowns
     *
     * @private
     */
    _mouseEnter(e, dropdown) {
        this._toggle(dropdown, true);
    }

    /**
     * Mouse leave event for dropdowns
     *
     * @private
     */
    _mouseLeave(e, dropdown) {
        this._hide(dropdown);
    }

    /**
     * Listener for the focusout event when an element loses it's focus, necessary for tab control
     *
     * @private
     */
    _focusOut(e, dropdown) {
        if (e.relatedTarget && this.active.length > 0 && !dropdown.contains(e.relatedTarget)) {
            this._hide(dropdown);
        }
    }

    /**
     * Initializes the dropdown
     *
     * @private
     */
    _initDropdown(dropdown) {
        this._addSubMenuButton(dropdown)

        const minWidth = window.innerWidth >= this.options.minWidth;

        dropdown.addEventListener('mouseenter', e => { minWidth && this._mouseEnter(e, dropdown) });
        dropdown.addEventListener('mouseleave', e => { minWidth && this._mouseLeave(e, dropdown) });
        dropdown.addEventListener('focusout', e => { minWidth && this._focusOut(e, dropdown) });
    }
}
