<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUbgProvincesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ubg_provinces', function (Blueprint $table) {
            $table->string('id', 4);
            $table->string('name', 45);
            $table->string('department_id', 2);
            $table->timestamps();
            $table->primary('id');

            $table->foreign('department_id')
                  ->references('id')
                  ->on('ubg_departments');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ubg_provinces');
    }
}
