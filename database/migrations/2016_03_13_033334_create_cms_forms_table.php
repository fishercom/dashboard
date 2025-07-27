<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCmsFormsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cms_forms', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name');
			$table->string('alias', 50)->unique();
			$table->string('info', 512)->nullable();
			$table->string('color', 25)->nullable();
			$table->boolean('active')->nullable();
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
		Schema::drop('cms_forms');
	}

}
