CREATE TABLE `datawarehouse`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  `apellido` VARCHAR(30) NOT NULL,
  `usuario` VARCHAR(25) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(15) NOT NULL,
  `telefono` VARCHAR(10) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `admin` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `datawarehouse`.`usuarios` (`nombre`, `apellido`, `usuario`, `email`, `password`, `telefono`, `direccion`, `admin`) VALUES ('luis', 'rojas', 'luigi', 'luis@correo.com', '1234', '3507674623', 'calle 36', '1');
INSERT INTO `datawarehouse`.`usuarios` (`nombre`, `apellido`, `usuario`, `email`, `password`, `telefono`, `direccion`, `admin`) VALUES ('melisa', 'cosio', 'meli', 'meli@correo.com', '1234', '3437689796', 'carrera 37', '0');
INSERT INTO `datawarehouse`.`usuarios` (`nombre`, `apellido`, `usuario`, `email`, `password`, `telefono`, `direccion`, `admin`) VALUES ('samuel', 'ochoa', 'samy', 'samy@correo.com', '1234', '3437784096', 'carrera 57', '0');

---------------------------------------------------------------------------------------------
CREATE TABLE `datawarehouse`.`regiones` (
  `idregion` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idregion`));

  INSERT INTO `datawarehouse`.`regiones` (`nombre`) VALUES ('America');
  INSERT INTO `datawarehouse`.`regiones` (`nombre`) VALUES ('Europa');
  INSERT INTO `datawarehouse`.`regiones` (`nombre`) VALUES ('Asia');
  INSERT INTO `datawarehouse`.`regiones` (`nombre`) VALUES ('Oceania');
  INSERT INTO `datawarehouse`.`regiones` (`nombre`) VALUES ('Africa');

  ---------------------------------------------------------------

  CREATE TABLE `datawarehouse`.`paises` (
  `idpais` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idregion` INT NOT NULL,
  PRIMARY KEY (`idpais`),
  INDEX `pais_fk_region_idx` (`idregion` ASC) VISIBLE,
  CONSTRAINT `pais_fk_region`
    FOREIGN KEY (`idregion`)
    REFERENCES `datawarehouse`.`regiones` (`idregion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO `datawarehouse`.`paises` (`nombre`, `idregion`) VALUES ('colombia', '1');
INSERT INTO `datawarehouse`.`paises` (`nombre`, `idregion`) VALUES ('Argentina', '1');
INSERT INTO `datawarehouse`.`paises` (`nombre`, `idregion`) VALUES ('Francia', '2');
INSERT INTO `datawarehouse`.`paises` (`nombre`, `idregion`) VALUES ('España', '2');
INSERT INTO `datawarehouse`.`paises` (`nombre`, `idregion`) VALUES ('China', '3');
INSERT INTO `datawarehouse`.`paises` (`nombre`, `idregion`) VALUES ('Japon', '3');
INSERT INTO `datawarehouse`.`paises` (`nombre`, `idregion`) VALUES ('Australia', '4');
INSERT INTO `datawarehouse`.`paises` (`nombre`, `idregion`) VALUES ('Nueva Zelanda', '4');
INSERT INTO `datawarehouse`.`paises` (`nombre`, `idregion`) VALUES ('Nigeria', '5');
INSERT INTO `datawarehouse`.`paises` (`nombre`, `idregion`) VALUES ('Marruecos', '5');

----------------------------------------------------------------------


  CREATE TABLE `datawarehouse`.`ciudades` (
  `idciudad` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idpais` INT NOT NULL,
  PRIMARY KEY (`idciudad`),
  INDEX `ciudad_fk_pais_idx` (`idpais` ASC) VISIBLE,
  CONSTRAINT `ciudad_fk_pais`
    FOREIGN KEY (`idpais`)
    REFERENCES `datawarehouse`.`paises` (`idpais`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Medellin', '1');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Bogota', '1');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Buenos Aires', '2');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Rosario', '2');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Paris', '3');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Monaco', '3');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Madrid', '4');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Barcelona', '4');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Pekin', '5');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Wuhan', '5');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Tokio', '6');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Osaka', '6');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Sidney', '7');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Brisbane', '7');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Tauranga', '8');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Nelson', '8');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Abuya', '9');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Enugu', '9');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Fes', '10');
INSERT INTO `datawarehouse`.`ciudades` (`nombre`, `idpais`) VALUES ('Tanger', '10');

----------------------------------------------------------------------------------------------------

  CREATE TABLE `datawarehouse`.`contactos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(10) NOT NULL,
  `idregion` INT NOT NULL,
  `idpais` INT NOT NULL,
  `idciudad` INT NOT NULL,
  `idcompania` INT NOT NULL,
  `cargo` VARCHAR(45) NOT NULL,
  `canal_preferido` TEXT NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `datawarehouse`.`contactos` 
ADD INDEX `contacto_fk_region_idx` (`idregion` ASC) VISIBLE,
ADD INDEX `contacto_fk_pais_idx` (`idpais` ASC) VISIBLE,
ADD INDEX `contacto_fk_ciudad_idx` (`idciudad` ASC) VISIBLE,
ADD INDEX `contacto_fk_compania_idx` (`idcompania` ASC) VISIBLE;
;
ALTER TABLE `datawarehouse`.`contactos` 
ADD CONSTRAINT `contacto_fk_region`
  FOREIGN KEY (`idregion`)
  REFERENCES `datawarehouse`.`regiones` (`idregion`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `contacto_fk_pais`
  FOREIGN KEY (`idpais`)
  REFERENCES `datawarehouse`.`paises` (`idpais`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `contacto_fk_ciudad`
  FOREIGN KEY (`idciudad`)
  REFERENCES `datawarehouse`.`ciudades` (`idciudad`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `contacto_fk_compania`
  FOREIGN KEY (`idcompania`)
  REFERENCES `datawarehouse`.`companias` (`idcompania`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;




INSERT INTO `datawarehouse`.`contactos` (`nombre`, `apellido`, `email`, `telefono`, `idregion`, `idpais`, `idciudad`, `idcompania`, `cargo`, `canal_preferido`) VALUES ('luis', 'serna', 'luis@correo.com', '3137954623', '1', '1', '1', '1', 'desarrollador full stack', 'whatsapp, email');
INSERT INTO `datawarehouse`.`contactos` (`nombre`, `apellido`, `email`, `telefono`, `idregion`, `idpais`,  `idciudad`, `idcompania`, `cargo`, `canal_preferido`) VALUES ('samuel', 'mejia', 'samy@correo.com', '36954856', '2', '3',  '5', '2', 'piloto', 'telefono');
INSERT INTO `datawarehouse`.`contactos` (`nombre`, `apellido`, `email`, `telefono`, `idregion`, `idpais`, `idciudad`,  `idcompania`, `cargo`, `canal_preferido`) VALUES ('melisa ', 'bernal', 'meli@correo.com', '3139785462', '3', '6', '11', '3', 'trader', 'instagram');

--------------------------------------------------------------------------

CREATE TABLE `datawarehouse`.`companias` (
  `idcompania` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcompania`));

  INSERT INTO `datawarehouse`.`companias` (`nombre`) VALUES ('Acamica');
INSERT INTO `datawarehouse`.`companias` (`nombre`) VALUES ('Avianca');
INSERT INTO `datawarehouse`.`companias` (`nombre`) VALUES ('Sophos');
