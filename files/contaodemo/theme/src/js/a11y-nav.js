class A11yNav {

    constructor(options) {
        this.options = this._merge({
            selector: 'header .nav-main',
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

        this.navItems = [];
        this._init()
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
     * Initializes navigation item and sets aria-attributes if they do not exist
     *
     * @private
     */
    _initItems() {
        if (!this.navigation.ariaLabel) {
            this.navigation.ariaLabel = this.options.ariaLabels.main
        }

        this.navigation.querySelectorAll('li').forEach(item => {
            item.role = 'none';

            const navItem = item.firstElementChild;

            if (navItem.classList.contains('active')) {
                navItem.ariaCurrent = 'page';
            }

            if (!navItem.ariaLabel && navItem.title) {
                navItem.ariaLabel = navItem.title;
                navItem.removeAttribute('title');
            }

            this.navItems.push(navItem);
        })
    }

    /**
     * Placeholder button that is used to clone for each submenu item
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
     * Updates the aria labels based on the state and toggles the expand class
     *
     * @private
     */
    _updateAriaState(btn) {
        const state = btn.ariaExpanded ?? 'false';

        btn.closest('li.submenu')?.classList.toggle(this.options.classes.expand);
        btn.ariaLabel = (('false' === state) ? this.options.ariaLabels.collapse : this.options.ariaLabels.expand) + btn.dataset.label;
        btn.ariaExpanded = ('false' === state) ? 'true' : 'false';
    }

    /**
     * Adds a submenu button that toggles submenu navigations
     *
     * @private
     */
    _addSubMenuButton(item) {
        const btn = this.btn.cloneNode();

        btn.dataset.label = item.textContent;
        btn.ariaLabel = this.options.ariaLabels.expand + item.textContent;

        btn.addEventListener('click', () => {
            this._updateAriaState(btn);
        });

        item.after(btn);
    }

    /**
     * Initializes the accessibility navigation
     *
     * @private
     */
    _init() {
        this._initItems();
        this._createSubMenuButton();

        this.navItems.forEach(item => {
            if (item.classList.contains('submenu')) {
                this._addSubMenuButton(item);
            }
        });
    }
}
