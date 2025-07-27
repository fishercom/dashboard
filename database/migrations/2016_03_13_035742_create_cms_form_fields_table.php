<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCmsFormFieldsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cms_form_fields', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('form_id')->unsigned();
			$table->string('name');
			$table->string('alias');
			$table->string('type', 15);
			$table->text('options')->nullable();
			$table->boolean('active')->nullable();
			$table->timestamps();

			$table->foreign('form_id')
				  ->references('id')
				  ->on('cms_forms')
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
		Schema::drop('cms_form_fields');
	}

}
