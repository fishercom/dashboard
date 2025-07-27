<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsForm extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $table = 'cms_forms';
	protected $fillable = ['name', 'alias', 'info', 'color', 'active'];

}
