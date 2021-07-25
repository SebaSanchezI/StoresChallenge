/* INSTRUCCIONES
1 - cargar las tiendas
2 - Cargar usuarios (al menos el primero)
 */

/* CARGA DE TIENDAS */

INSERT INTO stores(name,address,city,postal_code,image)
VALUES ('red sport','san martin 2345','santa fe','3000','https://d26lpennugtm8s.cloudfront.net/stores/278/672/rte/corner-3.jpg');

INSERT INTO stores(name,address,city,postal_code,image)
VALUES ('tienda shop','belgrano 145','parana','3002','https://i.pinimg.com/originals/a8/2f/4f/a82f4fc407da997d1cbc0017cfeb73be.png');

INSERT INTO stores(name,address,city,postal_code,image)
VALUES ('Tienda Deportes','san jeronimo 3145','rosario','3001','https://www.modaes.es/files//000_2016/decimas/Decimas%20tienda%20exterior.jpg');

/* CARGA DE USUARIOS */

INSERT INTO users(name,last_name,user_name,email,password,profile,image,store_id)
VALUES ('sebastian','sanchez isame','ssanchez','sebastian@mail.com','123456','cajero','',1);

INSERT INTO users(name,last_name,user_name,email,password,profile,image,store_id)
VALUES ('julian','vazquez','jvazquez','julian@mail.com','654321','supervisor','',1);

INSERT INTO users(name,last_name,user_name,email,password,profile,image,store_id)
VALUES ('leon',' vila','lvila','leon@mail.com','12345a','cajero','',1);

INSERT INTO users(name,last_name,user_name,email,password,profile,image,store_id)
VALUES ('luciano','depa','ldepa','luciano@mail.com','abc123','cajero','',2);

INSERT INTO users(name,last_name,user_name,email,password,profile,image,store_id)
VALUES ('alan','diaz','adiaz','alan@mail.com','123abc','supervisor','',2);

INSERT INTO users(name,last_name,user_name,email,password,profile,image,store_id)
VALUES ('melina','zel','mzel','melina@mail.com','abc123','cajero','',3);

INSERT INTO users(name,last_name,user_name,email,password,profile,image,store_id)
VALUES ('edith','fernandez','efernandez','edit@mail.com','123abc','supervisor','',3);






