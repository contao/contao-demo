<p align="center"><img src="https://contao.org/files/contao/logo/contao-logo-corporate.svg" alt="Contao Open Source CMS Logo"></p>
<h1 align="center">Contao Demo Website</h1>
<p align="center">This is an example website for Contao, a powerful open source CMS that allows you to create professional websites and scalable web applications.</p>
<p align="center">
    <a href="https://packagist.org/packages/contao/contao-demo"><img src="https://img.shields.io/packagist/v/contao/contao-demo.svg" alt="packagist version"></a>
    <a href="https://github.com/contao/contao-demo"><img src="https://img.shields.io/github/license/contao/contao-demo?color=2f7d32" alt="license"></a>
    <a href="https://packagist.org/packages/contao/contao-demo"><img src="https://img.shields.io/packagist/dt/contao/contao-demo?color=f47c00" alt="amount of downloads"></a>
</p>

![demo-preview.jpg](docs/assets/demo-preview.jpg "Preview image of the contao demo website")

## About

On the [demo website][demo], you will find demonstrations and examples of some of the features this CMS has to offer.
The Contao demo website can be added when installing the CMS and is designed to help you get started with your first web
projects.

Visit the [project website][contao] to learn more about Contao.


## Table of contents

- [Versions](#versions)
- [Installation](#installation)
    - [Contao Manager](#on-the-contao-manager)
    - [Composer](#using-composer)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Versions

The demo website is maintained for the currently supported Contao versions.
See the [Contao release plan][releaseplan] for details. Each version has a separate branch in this
Git repository.

We also have _rolling release tags_. This means the latest commit on each branch is tagged
with the respective Contao minor release. As an example, the branch "5.3.x" has a tag "5.3" on the latest commit.
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

1. Run the following command to create your project
   ```
   composer create-project contao/contao-demo:5.3 your-new-website
   ```
2. Connect the database e.g. through `DATABASE_URL` in your `.env.local` file.
   ```env
   # env.local / make sure to use the correct parameters
   DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name"
   ```
3. Import the database backup using the following command
   ```
   php vendor/bin/contao-console contao:backup:restore
   ```
4. Finalize the database and run the migrations
   ```
   php vendor/bin/contao-console contao:migrate
   ```
5. Create an admin user account and follow the instructions in your CLI
   ```
   php vendor/bin/contao-console contao:user:create
   ```

## Contributing

We use GitHub to collect issues and feature requests for the demo website. Feel free to open issues if
you have found a typing mistake or have ideas for new example content.

For general questions about Contao or the demo, please refer to the [community forums][forums] or
our [Slack channel][support].

## License

The Contao demo website is licensed under the terms of
the [CreativeCommons Attribution-ShareAlike 4.0 (CC-BY-SA-4.0)][license] license.

**TL;DR**  
You are free to use the Contao demo website as a base for any website you build, even commercially.
However, you must give appropriate credit, provide a link to the license, and indicate if changes were made.
If you remix, transform, or build upon the material, you must distribute your contributions under the same license as
the original.

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
[demo]: https://demo.contao.org
