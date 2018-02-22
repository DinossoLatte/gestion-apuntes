package dinossolatte.service;

import dinossolatte.domain.Data;
import java.util.List;

/**
 * Service Interface for managing Data.
 */
public interface DataService {

    /**
     * Save a data.
     *
     * @param data the entity to save
     * @return the persisted entity
     */
    Data save(Data data);

    /**
     * Get all the data.
     *
     * @return the list of entities
     */
    List<Data> findAll();

    /**
     * Get the "id" data.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Data findOne(Long id);

    /**
     * Delete the "id" data.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
