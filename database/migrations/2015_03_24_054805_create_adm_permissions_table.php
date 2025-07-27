<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdmPermissionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('adm_permissions', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('profile_id')->unsigned();
			$table->integer('event_id')->unsigned();
			$table->timestamps();

            $table->foreign('profile_id')
                  ->references('id')
                  ->on('profiles')
                  ->onDelete('cascade');

            $table->foreign('event_id')
                  ->references('id')
                  ->on('adm_events')
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
		Schema::drop('adm_permissions');
	}

}
