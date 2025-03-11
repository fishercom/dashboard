<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CrmAgenteCertificacion extends Model
{
    use HasFactory;
	protected $table = 'crm_agente_certificaciones';
	protected $fillable = ['agente_id', 'certificacion_id', 'codigo', 'metadata', 'enviado'];
    protected $casts = [
        'metadata' => 'array',
    ];

    public function certificacion()
    {
        return $this->hasOne('App\Models\CrmCertificacion', 'id', 'certificacion_id');
    }
    public function agente()
    {
        return $this->hasOne('App\Models\CrmAgente', 'id', 'agente_id');
    }

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $codigo = str_pad($model->agente_id, 4, "0", STR_PAD_LEFT);
            $codigo .= '-'.Str::upper(Str::random(8));
            $codigo .= '-'.str_pad($model->certificacion_id, 4, "0", STR_PAD_LEFT);
            $model->codigo = $codigo;
        });
    }
}
