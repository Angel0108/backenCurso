
create database ecommerce;
use ecommerce;

create table productos(
	id int unsigned not null auto_increment,
    title varchar(50) not null,
    price varchar(20) not null,
    thumnail varchar(250),
    primary key(id)
);

insert into productos (title, price, thumnail) values
('naranja', '80', 'url'),
('manzana', '60', 'url'),
('pera', '150', 'url');

