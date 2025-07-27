<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsConfig extends Model
{

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $table = 'cms_configs';
	protected $fillable = ['type', 'name', 'alias', 'value'];

}
