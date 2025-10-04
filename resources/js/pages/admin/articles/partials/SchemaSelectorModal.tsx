
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { getSchemas } from '@/services/schemas';
import { Article, Schema } from '@/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  parentSchemaId: number | undefined;
  data: Article[]
}

export default function SchemaSelectorModal({ isOpen, onClose, parentSchemaId, data }: Props) {
  const [schemas, setSchemas] = useState<Schema[]>([]);
  const [loading, setLoading] = useState(false);
  const items = data;

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getSchemas(parentSchemaId)
        .then(response => {
            setSchemas(response.data);
        })
        .catch(error => {
            console.error("Failed to fetch schemas:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }
  }, [isOpen, parentSchemaId]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Seleccionar Esquema</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl">&times;</button>
        </div>
        <div className="mt-4 min-h-[150px]">
          {loading ? (
            <p className="text-gray-600 dark:text-gray-300">Cargando...</p>
          ) : schemas.length > 0 ? (
            <ul className="space-y-2">
              {schemas.filter(e=>e.iterations==0 || e.iterations>items.filter(a=>a.schema_id==e.id).length).map(schema => (
                <li key={schema.id}>
                  <Link
                    href={`/admin/articles/create?schema_id=${schema.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={onClose}
                  >
                    {schema.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">No hay esquemas hijos disponibles.</p>
          )}
        </div>
        <div className="mt-6 flex justify-end border-t border-gray-200 dark:border-gray-700 pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
