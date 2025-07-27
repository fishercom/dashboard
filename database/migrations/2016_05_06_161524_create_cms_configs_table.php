<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCmsConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cms_configs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type', 10);  //string, int, text, date
            $table->string('name');
            $table->string('alias', 20); //var_name
            $table->string('value', 512)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('cms_configs');
    }
}
