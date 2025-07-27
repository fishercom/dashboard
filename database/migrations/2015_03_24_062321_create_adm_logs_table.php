<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdmLogsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('adm_logs', function(Blueprint $table)
		{
			$table->bigincrements('id');
			$table->integer('event_id')->unsigned();
			$table->biginteger('user_id')->unsigned();
			$table->string('comment', 512)->nullable();
			$table->timestamps();

			$table->foreign('event_id')
		          ->references('id')
		          ->on('adm_events')
		          ->onDelete('cascade');

			$table->foreign('user_id')
		          ->references('id')
		          ->on('users')
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
		Schema::drop('adm_logs');
	}

}
