<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUbgDistrictsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ubg_districts', function (Blueprint $table) {
            $table->string('id', 6);
            $table->string('name', 45);
            $table->string('department_id', 2);
            $table->string('province_id', 4);
            $table->timestamps();
            $table->primary('id');

            $table->foreign('department_id')
                  ->references('id')
                  ->on('ubg_departments');

            $table->foreign('province_id')
                  ->references('id')
                  ->on('ubg_provinces');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ubg_districts');
    }
}
