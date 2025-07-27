<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdmEventsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('adm_events', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('module_id')->unsigned();
			$table->integer('action_id')->unsigned();
			$table->timestamps();

            $table->foreign('module_id')
                  ->references('id')
                  ->on('adm_modules')
                  ->onDelete('cascade');

            $table->foreign('action_id')
                  ->references('id')
                  ->on('adm_actions')
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
		Schema::drop('adm_events');
	}

}
