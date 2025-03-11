<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdmLog extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'adm_logs';
    protected $fillable = ['event_id', 'user_id', 'comment'];

    public function user()
    {
        return $this->hasOne('App\Models\User', 'id', 'user_id');
    }

    public function event()
    {
        return $this->hasOne('App\Models\AdmEvent', 'id', 'event_id');
    }

}
