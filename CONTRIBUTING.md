# Contributing

We use GitHub to collect issues and feature requests for the demo website.
Feel free to open issues if you have found a typing mistake or have ideas for new example content.

For general questions about Contao or the demo, please refer to the [community forums][forums] or our [Slack channel][support].

---

## Install the demo website using composer

This repository functions as a _Composer project_. You can install a full Contao application and
this demo using the `create-project` command. We're assuming here you are familiar with the
command line and Composer and have a functioning PHP and webserver setup.

1. Run the following command to create your project
    ```bash
    composer create-project contao/contao-demo:5.3 your-new-website
    ```
2. Connect the database e.g. through `DATABASE_URL` in your `.env.local` file.
    ```env
    # env.local / make sure to use the correct parameters
    DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name"
    ```
3. Import the database backup using the following command
    ```bash
    php vendor/bin/contao-console contao:backup:restore
    ```
4. Finalize the database and run the migrations
    ```bash
    php vendor/bin/contao-console contao:migrate
    ```
5. Create an admin user account and follow the instructions in your CLI
    ```bash
    php vendor/bin/contao-console contao:user:create
    ```

## Development Workflow

When fixing bugs or adding a feature, please follow the mentioned workflow

1. Fork the contao-demo

2. Checkout your branch

3. Prepare your environment and update your dependencies
    ```bash
    composer up -o --no-dev
    ```
    Restore from the backup
    ```bash
    php bin/console contao:backup:restore backup__20250101000000.sql
    ```
    Run migrations
    ```bash
    php bin/console contao:migrate --no-backup
    ```

4. Implement your changes

5. Before pushing your work or opening a pull request, update your dependencies
    ```bash
    composer up -o --no-dev
    ```
    Run the migrations
    ```bash
    php bin/console contao:migrate --no-backup
    ```
    Create the backup
    ```bash
    php bin/console contao:backup:create backup__20250101000000.sql -i +tl_undo,+tl_cron_job,+tl_version,+tl_message_queue,+rememberme_token,+tl_trusted_device,+altcha_challenges
    ```

6. Disable the `k.jones` admin account as an administrator

7. Commit your changes

8. Open the pull request and target it against the base branch

[forums]: https://community.contao.org
[support]: https://to.contao.org/support
