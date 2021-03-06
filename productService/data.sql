CREATE TABLE public.products (
    id uuid NULL,
    title text NOT NULL,
    description text NULL,
    price integer NULL,
    CONSTRAINT products_pk PRIMARY KEY (id)
);

CREATE TABLE public.stock (
    product_id uuid NULL,
    count integer NOT NULL,
    CONSTRAINT stocks_fk FOREIGN KEY (product_id) REFERENCES public.products(id)
);

INSERT INTO public.products (id,title,description,price)
	VALUES ('339465d0-2077-11eb-bbe3-028d774dc6a1','Пирожок с картохой','Сойдет по вкусу',10);
INSERT INTO public.products (id,title,description,price)
	VALUES ('339465d0-2077-11eb-bbe3-028d774dc6a2','Пирожок с тестом','Вкусный пирожок',15);
INSERT INTO public.products (id,title,description,price)
	VALUES ('339465d0-2077-11eb-bbe3-028d774dc6a3','Пирожок с тобой','Ты самый вкусный',1000000);

INSERT INTO public.stock (product_id,count)
	VALUES ('339465d0-2077-11eb-bbe3-028d774dc6a1',50);
INSERT INTO public.stock (product_id,count)
	VALUES ('339465d0-2077-11eb-bbe3-028d774dc6a2',20);
INSERT INTO public.stock (product_id,count)
	VALUES ('339465d0-2077-11eb-bbe3-028d774dc6a3',1);
