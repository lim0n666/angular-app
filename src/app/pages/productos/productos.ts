import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductosServices } from '../../services/productos'; // Ajusta la ruta relativa a tu archivo
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit {
  productos = signal<Producto[]>([]);

  // Inyección limpia usando el nombre real de tu clase:
  private servicio = inject(ProductosServices);

  ngOnInit(): void {
    this.servicio.obtenerProductos().subscribe({
      next: (dato: Producto[]) => {
        const productos: Producto[] = Array.isArray(dato) ? dato : [];
        this.productos.set(productos);
        console.log(productos.slice(0, 8));
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }
}