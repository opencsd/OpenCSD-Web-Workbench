SELECT p_brand,
       p_type,
       p_size,
       Count(DISTINCT ps_suppkey) AS supplier_cnt
FROM   partsupp,
       part
WHERE  p_partkey = ps_partkey
       AND p_brand <> 'Brand#34'
       AND p_type NOT LIKE 'LARGE BRUSHED%'
       AND p_size IN ( 48, 19, 12, 4,
                       41, 7, 21, 39 )
       AND ps_suppkey NOT IN (SELECT s_suppkey
                              FROM   supplier
                              WHERE  s_comment LIKE '%CUSTOMER%COMPLAINTS%')
GROUP  BY p_brand,
          p_type,
          p_size
ORDER  BY supplier_cnt DESC,
          p_brand,
          p_type,
          p_size; 