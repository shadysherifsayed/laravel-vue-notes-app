# Notes App
### Prerequisites
* [Composer](https://getcomposer.org/download/ "Download Composer")

-----------------------------------------------------------------------------------

### Installation
This is a guide that explains how to run this app on your local machine. Kindly, follow the following steps:

  1. First step is to install all dependencies needed, use `composer install` command to install all needed dependencies from `composer.json`

  2. Create a copy from `.env.example` and rename it to `.env` and modify it with your DB credintials. The DB driver used is `mysql`
 ```sh
// Change those lines
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
 ```
  3. Use this command `php artisan key:generate` to generate an app key for **Laravel** 
  4. After setting up your DB connection **and** creating the DB **manually**, simply run this command `php artisan migrate` to migrate tables.

  5. Lastly, you should run the `php artisan passport:install` command. This command will create the encryption keys needed to generate secure access tokens. In addition, the command will create "personal access" and "password grant" clients which will be used to generate access tokens.

----------------------------------------------------------------------

### Help

##### Error #1
While migrating if you encounters this error
`PDOException::("SQLSTATE[42000]: Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes")`

_**Solution**_
Go to `app->Providers->AppServiceProvider.php` and add this line to `boot` method.
``` sh
use Illuminate\Support\Facades\Schema;
public function boot()
    {
        Schema::defaultStringLength(191);
    }
```

##### Error #2
`SQLSTATE[42S01]: Base table or view already exists:`
_**Solution**_
Simply run the following commands
``` sh
$ php artisan migrate:fresh
$ php artisan passport:install
```
