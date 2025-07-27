<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCmsSchemasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cms_schemas', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('parent_id')->unsigned()->nullable();
			$table->integer('group_id')->unsigned();
			$table->string('name');
			$table->json('fields');
			$table->integer('iterations')->unsigned()->nullable();
			$table->enum('type', ['PAGE', 'HOME', 'OPTIONS'])->nullable()->default('PAGE');
			$table->integer('position')->unsigned()->nullable();
			$table->boolean('active')->nullable();
			$table->timestamps();

            $table->foreign('parent_id')
                  ->references('id')
                  ->on('cms_schemas')
                  ->onDelete('cascade');

            $table->foreign('group_id')
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
		Schema::drop('cms_schemas');
	}

}
