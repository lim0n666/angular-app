import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInput, Producto } from '../models/producto.model';

@Service()
export class ProductosServices {
  private readonly url = 'https://fakestoreapi.com/products';
  private readonly http = inject(HttpClient);

  getProductos(): Observable<Producto[]> {
    return this.obtenerProductos();
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  // Crear producto
  crearProducto(producto: ProductInput): Observable<Producto> {
    return this.http.post<Producto>(this.url, producto);
  }

  // Actualizar producto
  actualizarProducto(id: number, producto: ProductInput): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/${id}`, producto);
  }

  // Eliminar producto
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/categories`);
  }
}
