<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UbgDepartment extends Model
{
	protected $table = 'ubg_departments';

    public $incrementing = false;
    protected $casts = [
        'id' => 'string',
    ];
    protected $keyType = 'string';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['id', 'name'];
}
