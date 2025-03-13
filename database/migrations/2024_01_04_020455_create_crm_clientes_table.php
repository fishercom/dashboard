<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCrmClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crm_clientes', function (Blueprint $table) {
            $table->id();

            $table->string('email')->unique();
            $table->string('username')->unique();
            $table->string('password');

            $table->enum('tipo_persona', ['NATURAL', 'JURIDICA']);
            $table->enum('tipo_documento', ['DNI', 'CE']);
            $table->string('nro_documento', 25);
            $table->string('nombre');
            $table->string('apellido_paterno');
            $table->string('apellido_materno');

            $table->string('direccion');
            $table->string('departamento_id', 2);
            $table->string('provincia_id', 4);
            $table->string('distrito_id', 6);
            $table->string('telefono', 20)->nullable();
            $table->string('celular', 20);

            $table->boolean('acepto_terminos')->nullable();

            $table->enum('estado', ['ACTIVO', 'INACTIVO', 'BLOQUEADO'])->nullable();

            $table->rememberToken();
            $table->timestamps();

            $table->foreign('departamento_id')
                  ->references('id')
                  ->on('ubg_departments');

            $table->foreign('provincia_id')
                  ->references('id')
                  ->on('ubg_provinces');

            $table->foreign('distrito_id')
                  ->references('id')
                  ->on('ubg_districts');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crm_clientes');
    }
}
