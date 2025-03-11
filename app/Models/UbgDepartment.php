<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UbgDepartment extends Model
{
	protected $table = 'ubg_departments';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['id', 'name'];
}
