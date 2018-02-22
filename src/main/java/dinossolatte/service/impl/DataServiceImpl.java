package dinossolatte.service.impl;

import dinossolatte.service.DataService;
import dinossolatte.domain.Data;
import dinossolatte.repository.DataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Data.
 */
@Service
@Transactional
public class DataServiceImpl implements DataService {

    private final Logger log = LoggerFactory.getLogger(DataServiceImpl.class);

    private final DataRepository dataRepository;

    public DataServiceImpl(DataRepository dataRepository) {
        this.dataRepository = dataRepository;
    }

    /**
     * Save a data.
     *
     * @param data the entity to save
     * @return the persisted entity
     */
    @Override
    public Data save(Data data) {
        log.debug("Request to save Data : {}", data);
        return dataRepository.save(data);
    }

    /**
     * Get all the data.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Data> findAll() {
        log.debug("Request to get all Data");
        return dataRepository.findAll();
    }

    /**
     * Get one data by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Data findOne(Long id) {
        log.debug("Request to get Data : {}", id);
        return dataRepository.findOne(id);
    }

    /**
     * Delete the data by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Data : {}", id);
        dataRepository.delete(id);
    }
}
