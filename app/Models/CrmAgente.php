<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class CrmAgente extends Model
{
    use HasFactory;
    use Notifiable;
	protected $table = 'crm_agentes';
	protected $fillable = ['perfil_id', 'name', 'email', 'obs', 'metadata', 'active'];
    protected $casts = [
        'metadata' => 'array',
    ];

    public function perfil()
    {
        return $this->hasOne('App\Models\CrmPerfilAgente', 'id', 'perfil_id');
    }

    public function certificaciones()
    {
        return $this->hasMany('App\Models\CrmAgenteCertificacion', 'agente_id', 'id');
    }

}
