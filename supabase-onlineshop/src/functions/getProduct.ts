// import type { Product } from "../interfaces/Product"
import type { Product } from "../interfaces/Product"
import supabase from "../utils/supabase"

// SELECT * FROM products;

export async function getProducts_store(): Promise<Product[]> {
  const { data: products, error } = await supabase.from("products").select("*").textSearch("title", "laptop | maus")

  if (error) console.error(error)

  return products as Product[]
}

// % selectQueries filter Supabase Methoden
// * Filtern mit eq(), lt(), gt(), like(), between(), in(), usw.

// + SELECT * FROM products WHERE quality = "High";
// ~ const { data: products, error } = await supabase.from("products").select("*").eq("quality", "High")

// ~ const { data: products, error } = await supabase.from("products").select("*").neq("quality", "Low")

// + SELECT * FROM products WHERE quality = "High" AND price < 500;
// ~ const { data: products, error } = await supabase.from("products").select("*").eq("quality", "High").lt("price", 500)

// + SELECT * FROM products WHERE price >= 50 AND price <= 200;
// ~ const { data: products, error } = await supabase.from("products").select("*").eq("quality", "High").gte("price", 50).lte("price", 200)

// + SELECT * FROM products WHERE price BETWEEN 50 AND 200
// ~ const { data: products, error } = await supabase.from("products").select("*").between("price", 50, 200)

// + SELECT * FROM products WHERE quality IN ("High", "Medium");
// ~ const { data: products, error } = await supabase.from("products").select("*").in("quality", ["High", "Medium"])

// + SELECT * FROM products WHERE quality = "High" OR price < 50;
// ~ const { data: products, error } = await supabase.from("products").select("*").or("quality.eq.High, price.lt.50")

// + SELECT * FROM products WHERE price >= 50 AND quality = "High";
// ~ const { data: products, error } = await supabase.from("products").select("*").filter("price", "gte", 50).filter("quality", "eq", "High")

// + SELECT * FROM products WHERE title LIKE "%laptop%"
// ~ const { data: products, error } = await supabase.from("products").select("*").ilike("title", "%laptop%")

// + SELECT title, price FROM products WHERE quality = "High";
// ~ const { data: products, error } = await supabase.from("products").select("title, price").eq("quality", "High")

// ~ const { data: products, error } = await supabase.from("products").select("*").textSearch("title", "laptop | maus")
