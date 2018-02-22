package dinossolatte.repository;

import dinossolatte.domain.Data;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Data entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DataRepository extends JpaRepository<Data, Long> {

}
