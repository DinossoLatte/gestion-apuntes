package dinossolatte.repository;

import dinossolatte.domain.Folder;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Folder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

}
