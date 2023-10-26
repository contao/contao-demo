Contao Demo Website
===================

This is an example website for Contao, a powerful open source CMS that allows you to create professional websites and scalable web applications.

On the demo website, you will find demonstrations and examples of some of the features this CMS has to offer.
The Contao demo website can be added when installing the CMS and is designed to help you get started with your first web projects.

Visit the [project website][contao] to learn more about Contao.


## Versions

The demo website is maintained for the currently supported Contao versions. 
See the [Contao release plan][releaseplan] for details. Each version has a separate branch in this
Git repository.

We also have _rolling release tags_. This means the latest commit on each branch is tagged
with the respective Contao minor release. As an example, the branch "5.2.x" has a tag "5.2" on the latest commit.
These tags enable you to install the latest demo content for any Contao minor version.

## Installation

The demo website can be installed alongside Contao, either through the Contao
Manager or with [Composer][composer] on the command line.

### On the Contao Manager

When installing a fresh Contao application, select the desired version and check the 
"Install the Contao demo website" checkbox. Make sure to also import the database backup when the
Contao Manager asks you to. That's it!

### Using Composer

This repository functions as a _Composer project_. You can install a full Contao application and
this demo using the `create-project` command. We're assuming here you are familiar with the
command line and Composer and have a functioning PHP and webserver setup.

1. Run `composer create-project contao/contao-demo:5.2 your-new-website`
2. Connect the database e.g. through `DATABASE_URL` in your `.env.local` file.
2. Import the database backup using `php vendor/bin/contao-console contao:backup:restore`


## Contributing

We use GitHub to collect issues and feature requests for the demo website. Feel free to open issues if 
you have found a typing mistake or have ideas for new example content.

For general questions about Contao or the demo, please refer to the [community forums][forums] or 
our [Slack channel][support].


## License

The Contao demo website is licensed under the terms of the [CreativeCommons Attribution-ShareAlike 4.0 (CC-BY-SA-4.0)][license] license.

**TL;DR**  
You are free to use the Contao demo website as a base for any website you build, even commercially.
However, you must give appropriate credit, provide a link to the license, and indicate if changes were made.
If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.


## Credits

The screendesign for the Contao Official Demo was sponsored by the Contao Association and borowiakziehe KG. 
It has been designed by Dennis Weinhardt whom we would like to thank for the great work.

The Contao demo website is maintained by volunteers of the respective [Contao team][team]. It supersedes the
[Contao Official Demo][old], our previous Contao example website. Many thanks to the Official Demo team for
their contributions in the past.



[contao]: https://contao.org
[team]: https://to.contao.org/team
[old]: https://github.com/contao/official-demo
[license]: https://creativecommons.org/licenses/by-sa/4.0/
[releaseplan]: https://to.contao.org/release-plan
[composer]: https://getcomposer.org
[forums]: https://community.contao.org
[support]: https://to.contao.org/support
