<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdmPermission extends Model {

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['event_id', 'profile_id'];
	protected $table = 'adm_permissions';
}
