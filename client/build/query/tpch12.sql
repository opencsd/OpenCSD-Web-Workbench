SELECT l_shipmode,
       SUM(CASE
             WHEN o_orderpriority = '1-urgent'
                   OR o_orderpriority = '2-high' THEN 1
             ELSE 0
           END) AS high_line_count,
       SUM(CASE
             WHEN o_orderpriority <> '1-urgent'
                  AND o_orderpriority <> '2-high' THEN 1
             ELSE 0
           END) AS low_line_count
FROM   orders,
       lineitem
WHERE  o_orderkey = l_orderkey
       AND l_shipmode IN ( 'RAIL', 'FOB' )
       AND l_commitdate < l_receiptdate
       AND l_shipdate < l_commitdate
       AND l_receiptdate >= DATE '1997-01-01'
       AND l_receiptdate < DATE '1997-01-01' + interval '1' year
GROUP  BY l_shipmode
ORDER  BY l_shipmode; 