import React from 'react';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-zinc-200 dark:border-zinc-800">
            <div className="aspect-[16/9] overflow-hidden">
                <img
                    src={vehicle.imagenUrl}
                    alt={`${vehicle.marca.nombre} ${vehicle.modelo}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            {vehicle.marca.nombre}
                        </p>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-1">
                            {vehicle.modelo}
                        </h3>
                    </div>
                    <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-semibold text-zinc-900 dark:text-white">
                        {vehicle.anio}
                    </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {vehicle.transmision?.tipo || 'N/A'}
                    </div>
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        {vehicle.combustible?.tipo || 'N/A'}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                        ${vehicle.precio.toLocaleString()}
                    </div>
                    <Link to={`/vehiculo/${vehicle.id}`} className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity">
                        Ver Detalles
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
