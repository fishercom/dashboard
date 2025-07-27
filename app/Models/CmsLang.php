<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsLang extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $table = 'cms_langs';
	protected $fillable = ['name', 'iso', 'active'];

}
