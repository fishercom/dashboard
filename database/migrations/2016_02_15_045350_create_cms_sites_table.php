<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCmsSitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cms_sites', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('segment', 25)->nullable();
            $table->string('site_url')->unique();
            $table->text('metadata')->nullable(); //assets, upload, customs
            $table->integer('schema_group_id')->unsigned();
            $table->boolean('default')->nullable();
            $table->boolean('active')->nullable();
            $table->timestamps();

            $table->unique('segment');
            $table->foreign('schema_group_id')
                  ->references('id')
                  ->on('cms_schema_groups')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cms_sites');
    }
}
