package dinossolatte.service;

import dinossolatte.domain.Folder;
import java.util.List;

/**
 * Service Interface for managing Folder.
 */
public interface FolderService {

    /**
     * Save a folder.
     *
     * @param folder the entity to save
     * @return the persisted entity
     */
    Folder save(Folder folder);

    /**
     * Get all the folders.
     *
     * @return the list of entities
     */
    List<Folder> findAll();

    /**
     * Get the "id" folder.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Folder findOne(Long id);

    /**
     * Delete the "id" folder.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
