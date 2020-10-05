# FEUP-DAPI

Project developed in the DAPI course classes

## Project Infos
* **Date:** 5th Year, 1st Semester, 2020/2021
* **Topic:** Book-related Search Engine
* **Course:** Descrição, Armazenamento e Pesquisa de Informação (DAPI) | Information Description, Storage and Retrieval
* **Course Link:** https://sigarra.up.pt/feup/pt/UCURR_GERAL.FICHA_UC_VIEW?pv_ocorrencia_id=459526
* **In collaboration with:** Bruno Sousa ([@Rekicho](https://github.com/Rekicho)), Filipa Durão ([@FilipaDurao](https://github.com/FilipaDurao)) and Miguel Duarte ([@miguelpduarte](https://github.com/miguelpduarte))

## Setup

### Starting Services

Simply start the `db` and `pgadmin` services by running:

```
docker-compose up
```

### Creating the Database

To create the database with the given schema, simply run:

```
psql -h 127.0.0.1 -U user -d library -f db/schema.sql
```

### pgAdmin Dashboard

[pgAdmin](https://www.pgadmin.org/) is a web interface to access your postgres database. After running services as explained above, access the [login page](http://localhost:4000) and login with the default credentials (which may be found in `.env`).

After you're in, choose **Add New Server** to add a new server connection. You may name it whatever you want. In the `Connection` tab, add the following information:

![image](https://user-images.githubusercontent.com/25830462/95083134-fd471800-0713-11eb-87e8-60d9c26d9eba.png)

## Usage

To connect to the database via CLI, you may use `psql`:

```
psql -h 127.0.0.1 -U user -d library
```

### Disclaimer

This repository, and every other `FEUP-COURSE*` repos on GitHub correspond to school projects from the respective *COURSE*. The code on this repo is intended for educational purposes. I do not take any responsibility, liability or whateverity over any code faults, inconsistency or anything else. If you intend on copying most or parts of the code for your school projects, keep in mind that this repo is public, and that your professor might search the web for similar project solutions or whatnot and choose to fail you for copying.
