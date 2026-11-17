import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosServices } from '../../services/productos'; // Ajusta la ruta a tu servicio
import { ProductInput, Producto } from '../../models/producto.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel implements OnInit {
onPriceChange(arg0: any) {
throw new Error('Method not implemented.');
}
Number(arg0: any): number {
throw new Error('Method not implemented.');
}

  private servicio = inject(ProductosServices);
  productos = signal<Producto[]>([])
  editingId = signal<number | null>(null)
  service = inject(ProductosServices);
  categories = signal<string[]>([]);


  ngOnInit(): void {
    this.cargarProductos()
    this.service.getCategories().subscribe((data) => this.categories.set(data));
    
  }

  cargarProductos(): void {
    this.servicio.obtenerProductos().subscribe({
      next: (datos: Producto[]) => {
        this.productos.set(datos);
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }
   // Datos del formulario, enlazados con ngModel
  form: ProductInput = { title: '', price: 0, description: '', category: '', image: '' };
   save(): void {

    if (!this.form.title || !this.form.category || !this.form.image || this.form.price <= 0) {
      
      return;
    }
    const id = this.editingId();
    if (id === null) {
      this.create();
    } else {
      this.update(id);
    }
  }
  // CREATE: agregar un producto
  private create(): void {
    this.service.crearProducto(this.form).subscribe({
      next: (product: Producto) => {
        this.productos.update((list) => [product, ...list]);
        this.cancel();
      },
      
    });
  }


  // UPDATE: guardar los cambios de un producto
  private update(id: number): void {
    this.service.actualizarProducto(id, this.form).subscribe({
      next: (product: Producto) => {
        this.productos.update((list) =>
          list.map((item) => (item.id === id ? { ...item, ...product } : item))
        );
       
        this.cancel();
      },
      
    });
  }
  // Llena el formulario con el producto que se va a editar
  edit(product: Producto): void {
    this.editingId.set(product.id);
    this.form = { ...product };
  }


  // Limpia el formulario y sale del modo edición
  cancel(): void {
    this.editingId.set(null);
    this.form = { title: '', price: 0, description: '', category: '', image: '' };
  }

  borrarProducto(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      
      this.productos.update((lista) => lista.filter((p) => (p as any).id !== id));
      console.log(`Producto ${id} eliminado localmente`);
    }
  }

  actualizarProducto(producto: Producto): void {
    console.log('Actualizar producto:', producto);
    
  }
}