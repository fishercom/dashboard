<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UbgDistrict extends Model
{
	protected $table = 'ubg_districts';

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
	protected $fillable = ['id', 'name', 'department_id', 'province_id'];
}
