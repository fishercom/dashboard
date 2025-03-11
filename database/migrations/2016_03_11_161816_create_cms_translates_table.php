<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCmsTranslatesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('cms_translates', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('alias');
			$table->tinyInteger('input_type')->unsigned();
            $table->json('metadata')->nullable();
			$table->timestamps();

		});	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('cms_translates');
	}

}
