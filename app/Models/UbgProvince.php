<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UbgProvince extends Model
{
	protected $table = 'ubg_provinces';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['id', 'name', 'department_id'];
}
