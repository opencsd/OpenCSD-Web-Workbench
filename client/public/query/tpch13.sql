SELECT c_count,
       Count(*) AS custdist
FROM   (SELECT c_custkey,
               Count(o_orderkey) AS c_count
        FROM   customer
               LEFT OUTER JOIN orders
                            ON c_custkey = o_custkey
                               AND o_comment NOT LIKE '%PENDING%DEPOSITS%'
        GROUP  BY c_custkey) c_orders
GROUP  BY c_count
ORDER  BY custdist DESC,
          c_count DESC; 