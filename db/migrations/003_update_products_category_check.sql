-- db-migrate.mjs รันไฟล์ทั้งหมดใหม่ทุกครั้ง ไฟล์นี้จึงทำได้แค่ถอด constraint เดิมออก
-- ถ้ามานิยามรายชื่อหมวดหมู่ซ้ำตรงนี้ด้วย มันจะพังทุกครั้งที่มีข้อมูลใช้หมวดที่เพิ่งเพิ่มใน 004
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
