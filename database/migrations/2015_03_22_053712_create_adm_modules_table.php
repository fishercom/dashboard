<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdmModulesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('adm_modules', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('menu_id')->unsigned();
			$table->string('name');
			$table->string('title')->nullable();
			$table->string('controller', 50);
			$table->string('params')->nullable();
			$table->string('icon', 50)->nullable();
			$table->integer('position')->unsigned();
			$table->boolean('active')->nullable();
			$table->timestamps();

            $table->foreign('menu_id')
                  ->references('id')
                  ->on('adm_menus')
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
		Schema::drop('adm_modules');
	}

}
