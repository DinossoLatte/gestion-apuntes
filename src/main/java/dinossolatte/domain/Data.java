package dinossolatte.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Data.
 */
@Entity
@Table(name = "data")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Data implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "full_path")
    private String fullPath;

    @Column(name = "jhi_size")
    private Integer size;

    @Column(name = "creation_date")
    private Instant creationDate;

    @ManyToOne
    private Folder folder;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Data name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFullPath() {
        return fullPath;
    }

    public Data fullPath(String fullPath) {
        this.fullPath = fullPath;
        return this;
    }

    public void setFullPath(String fullPath) {
        this.fullPath = fullPath;
    }

    public Integer getSize() {
        return size;
    }

    public Data size(Integer size) {
        this.size = size;
        return this;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public Data creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Folder getFolder() {
        return folder;
    }

    public Data folder(Folder folder) {
        this.folder = folder;
        return this;
    }

    public void setFolder(Folder folder) {
        this.folder = folder;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Data data = (Data) o;
        if (data.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), data.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Data{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", fullPath='" + getFullPath() + "'" +
            ", size=" + getSize() +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
