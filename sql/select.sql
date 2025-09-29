-- Alle Datensätze aus der Tabelle "Students" anzeigen
SELECT
  *
FROM
  Students;

--  Nur die Spalten "FirstName" und "LastName" aus der Tabelle "Students" anzeigen.
SELECT
  FirstName,
  LastName
FROM
  Students;

-- Alle Schüler aus dem Haus "Slytherin" anzeigen.
SELECT
  *
FROM
  Students
WHERE
  House = "Slytherin";

-- Alle Schüler im 6. Jahrgang aus dem Haus "Hufflepuff" anzeigen.
SELECT
  *
FROM
  Students
WHERE
  House = "Hufflepuff"
  AND YearOfStudy = 6;

-- Alle Schüler aus dem Haus "Slytherin" oder "Hufflepuff" anzeigen.
SELECT
  *
FROM
  Students
WHERE
  House = "Slytherin"
  OR House = "Hufflepuff";

SELECT
  *
FROM
  Students
WHERE
  House = "Slytherin"
  OR House = "Hufflepuff"
  OR House = "Gryffindor";

-- Alternative Schreibweise mit IN und Klammern
SELECT
  *
FROM
  Students
WHERE
  House IN ("Slytherin", "Hufflepuff", "Gryffindor");

-- Alle Students absteigend nach Geburtsdatum sortieren.
-- DESC für descending (absteigend)
-- ORDER BY ist für Sortierung zuständig.
SELECT
  *
FROM
  Students
ORDER BY
  BirthDate DESC;

-- Alle Students deren Vornamen mit "H" beginnen.
SELECT
  *
FROM
  Students
WHERE
  FirstName LIKE "H%";

-- Alle Students deren Vornamen ein "H" enthalten.
SELECT
  *
FROM
  Students
WHERE
  FirstName LIKE "%H%";

-- Alle Students deren Vornamen mit "H" beginnen und dann genau 5 weitere Zeichen haben.
-- _ steht für genau ein Zeichen (kein Platzhalter wie %).
SELECT
  *
FROM
  Students
WHERE
  FirstName LIKE "H_____";

-- Alle Students bei denen "unicorn" in der Spalte WandType vorkommt.
SELECT
  *
FROM
  Students
WHERE
  WandType LIKE "%unicorn%";

-- Alle Students deren Geburtsdatum zwischen 01.01.1980 und 31.12.1980 liegt.
-- BETWEEN ... AND ... wird für Bereiche verwendet.
SELECT
  *
FROM
  Students
WHERE
  BirthDate BETWEEN "1980-01-01" AND "1980-12-31";

-- Alle Students mit StudentID zwischen 11 und 20 anzeigen.
SELECT
  *
FROM
  Students
WHERE
  StudentID BETWEEN 11 AND 20;

-- Alle Students bei denen in der Spalte WandType ein Wert (nicht NULL) eingetragen ist.
SELECT
  *
FROM
  Students
WHERE
  WandType IS NOT NULL;

-- Alle Students bei denen in der Spalte WandType kein Wert (NULL) eingetragen ist.
SELECT
  *
FROM
  Students
WHERE
  WandType IS NULL;

-- Mit COUNT die Anzahl der Schüler bestimmen.
-- Das nennt sich eine Aggregatfunktion.
SELECT
  COUNT(*)
FROM
  Students;

-- Mit COUNT die Anzahl der Schüler aus dem Haus "Slytherin" bestimmen.
SELECT
  COUNT(*)
FROM
  Students
WHERE
  House = "Slytherin";

-- Man kann der Spalte auch einen Alias-Namen geben mit AS.
SELECT
  COUNT(*) AS NumberOfSlytherins
FROM
  Students
WHERE
  House = "Slytherin";

SELECT
  COUNT(*) AS "Number of Slytherins"
FROM
  Students
WHERE
  House = "Slytherin";

-- Mit MAX können wir den größten Wert einer Spalte ausgeben.
SELECT
  MAX(BirthDate)
FROM
  Students;

SELECT
  MAX(YearOfStudy)
FROM
  Students;

-- Mit MIN können wir den kleinsten Wert einer Spalte ausgeben.
SELECT
  MIN(BirthDate)
FROM
  Students;

SELECT
  MIN(YearOfStudy)
FROM
  Students;

-- Mit AVG können wir den Durchschnittswert einer Spalte ausgeben.
SELECT
  AVG(YearOfStudy)
FROM
  Students;

-- Mit SUM können wir die Summe aller Werte einer Spalte ausgeben.
SELECT
  SUM(YearOfStudy)
FROM
  Students;

-- Mit ROUND können wir einen Wert runden.
SELECT
  ROUND(AVG(YearOfStudy))
FROM
  Students;

SELECT
  ROUND(AVG(YearOfStudy), 2)
FROM
  Students;

-- Mit GROUP BY können wir Datensätze gruppieren.
-- Und mir dann z.B. die Anzahl der Students anzeigen lassen.
-- Wie viele Students gibt es pro House?
SELECT
  House,
  COUNT(*)
FROM
  Students
GROUP BY
  House;

-- Wie viele Students gibt es pro WandType?
SELECT
  WandType,
  COUNT(*)
FROM
  Students
GROUP BY
  WandType;

-- Nach House gruppieren und dann nochmal filtern nach den Gruppen (=Häusern) mit mindestens 10 Students.
SELECT
  House,
  COUNT(*)
FROM
  Students
GROUP BY
  House
HAVING
  COUNT(*) >= 10;

-- Die ersten 5 Datensätze aus Students anzeigen.
SELECT
  *
FROM
  Students
LIMIT
  5;

-- Mit OFFSET können wir Datensätze überspringen.
-- Zeige 10 Datensätze, überspringe aber die ersten 60 (also zeige Datensatz 61 bis 70).
SELECT
  *
FROM
  Students
LIMIT
  10
OFFSET
  60;

-- % EXTRA
SELECT
  *
FROM
  Students
ORDER BY
  StudentID DESC
LIMIT
  10;

-- CONCAT kann zwei oder mehr Strings zu einem String verbinden.
-- Am Besten mit einem Alias-Namen.
SELECT
  CONCAT (FirstName, " ", LastName) AS FullName
FROM
  Students;