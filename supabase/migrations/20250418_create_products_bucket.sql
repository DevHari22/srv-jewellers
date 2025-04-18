
-- Create a public storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'Products Images', true);

-- Allow authenticated users to upload product images
CREATE POLICY "Allow authenticated users to upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Allow authenticated users to update their uploaded product images
CREATE POLICY "Allow authenticated users to update product images"
ON storage.objects FOR UPDATE
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Allow authenticated users to delete their uploaded product images
CREATE POLICY "Allow authenticated users to delete product images"
ON storage.objects FOR DELETE
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Allow everyone to view product images
CREATE POLICY "Allow public to view product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'products');
