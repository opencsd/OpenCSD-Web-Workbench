SELECT ps_partkey,
       Sum(ps_supplycost * ps_availqty) AS value
FROM   partsupp,
       supplier,
       nation
WHERE  ps_suppkey = s_suppkey
       AND s_nationkey = n_nationkey
       AND n_name = 'MOZAMBIQUE'
GROUP  BY ps_partkey
HAVING Sum(ps_supplycost * ps_availqty) > (SELECT
       Sum(ps_supplycost * ps_availqty) * 0.0001000000
                                           FROM   partsupp,
                                                  supplier,
                                                  nation
                                           WHERE  ps_suppkey = s_suppkey
                                                  AND s_nationkey = n_nationkey
                                                  AND n_name = 'MOZAMBIQUE')
ORDER  BY value DESC; 